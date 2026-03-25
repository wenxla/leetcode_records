/**
 * Templater User Script: LeetCode Problem Fetcher
 * 
 * 使用方法：
 * 1. 将此文件放入 Templater 的 User Script 文件夹
 *    (Settings → Templater → User Script Functions Folder)
 * 2. 在模板中调用: <%* const lc = await tp.user.leetcode(tp) %>
 * 
 * 支持 leetcode.com 和 leetcode.cn 链接
 */

async function leetcode(tp) {
    const url = await tp.system.prompt("LeetCode URL?");
    if (!url) throw new Error("No URL provided");

    // 提取 slug，支持 leetcode.com 和 leetcode.cn
    const match = url.match(/leetcode\.(com|cn)\/problems\/([^\/\?#]+)/);
    if (!match) throw new Error("Invalid LeetCode URL");

    const site = match[1]; // "com" or "cn"
    const slug = match[2];
    const apiUrl = site === "cn"
        ? "https://leetcode.cn/graphql"
        : "https://leetcode.com/graphql";

    // 调用 LeetCode GraphQL API
    const response = await requestUrl({
        url: apiUrl,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Referer": `https://leetcode.${site}/problems/${slug}/`,
        },
        body: JSON.stringify({
            query: `query getQuestionDetail($titleSlug: String!) {
                question(titleSlug: $titleSlug) {
                    questionFrontendId
                    title
                    difficulty
                    content
                    topicTags { name }
                }
            }`,
            variables: { titleSlug: slug },
        }),
    });

    const q = response.json.data.question;

    // 难度映射为星级
    const difficultyMap = {
        "Easy": 1,
        "Medium": 3,
        "Hard": 5,
    };

    const difficultyStars = {
        "Easy": "⭐",
        "Medium": "⭐⭐⭐",
        "Hard": "⭐⭐⭐⭐⭐",
    };

    // HTML 转 Markdown（简易版，处理常见标签）
    function htmlToMarkdown(html) {
        if (!html) return "";
        return html
            .replace(/<pre>([\s\S]*?)<\/pre>/g, (_, code) => {
                const clean = code
                    .replace(/<\/?strong>/g, "")
                    .replace(/<\/?code>/g, "")
                    .replace(/<\/?em>/g, "")
                    .replace(/<br\s*\/?>/g, "\n")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&nbsp;/g, " ");
                return "\n```\n" + clean.trim() + "\n```\n";
            })
            .replace(/<code>(.*?)<\/code>/g, "`$1`")
            .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
            .replace(/<em>(.*?)<\/em>/g, "*$1*")
            .replace(/<li>\s*/g, "- ")
            .replace(/<\/li>/g, "\n")
            .replace(/<p>/g, "\n")
            .replace(/<\/p>/g, "\n")
            .replace(/<br\s*\/?>/g, "\n")
            .replace(/<sup>(.*?)<\/sup>/g, "^$1")
            .replace(/<[^>]+>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, " ")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    }

    const tags = q.topicTags.map(t => t.name);

    return {
        id: q.questionFrontendId,
        title: q.title,
        difficulty: q.difficulty,           // "Easy" / "Medium" / "Hard"
        // content: htmlToMarkdown(q.content), // 题目描述（Markdown）
        tags: tags,
        slug: slug,
        url: `https://leetcode.${site}/problems/${slug}/`,
    };
}

module.exports = leetcode;
