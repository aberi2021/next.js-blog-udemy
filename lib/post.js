import path from "path";
import fs from "fs"; //事前に用意されているモジュール群
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
//process.cwd()で全てのディレクトリの取得、postsはディレクトリ内のpostsをパスとして取得している

//mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory); //ファイル名の取得
  const allPostsData = fileNames.map((fileName) => {
    //map関数はひとつひとつ取り出すための関数。ひとつひとつ取り出すので単数のfileNameと命名。
    const id = fileName.replace(/\.md$/, ""); //　/\.md$/でファイル名の拡張子.mdを削除。第二引数は空として取り除くため""のみ

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName); //fileNameを使用することで、ひとつひとつのファイルに対するパスを取得
    const fileContents = fs.readFileSync(fullPath, "utf8"); //fullPathで指定された中身のデータを文字列として認識。readFilesSyncは同期的なファイル読み込み関数。

    const matterResult = matter(fileContents);

    //idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

//getStaticPathでreturnで使うPathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  /*
    [
      {
        params: {
        id: "ssg-ssr"
        }
      }
    ] 
  */
}

// idに基づいてブログの投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents);

  // マークダウンをHTML文字列に変換するためにremarkを使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const blogContentHTML = processedContent.toString();

  // データをidと組み合わせる
  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
