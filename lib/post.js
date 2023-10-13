import path from "path";
import fs from "fs";
import matter from "gray-matter";
import exp from "constants";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); //ファイル名をIDにする

    //mdファイルを文字列として読み込む
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    //IDとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const blogContent = await remark().use(html).process(matterResult.content);
  const contentHtml = blogContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
