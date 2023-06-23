import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import utilstyles from "../styles/utils.module.css";
import Link from "next/link";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  //getStaticPropsはNext.jsが用意した関数。外部から一度だけデータを取ってくる。SSGで使う。
  const allPostsData = await getPostsData(); //id,title,date,thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return (
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   );
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* ここがLayout.jsの{children}に入る中身になるよ */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilstyles.headingMd}>
        <p>
          私はコーダーです。マークアップをします。最近開業届を出しましたが仕事はありません。Next.jsを勉強しています。
        </p>
      </section>
      <section className={utilstyles.headingMd}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                ></img>
              </Link>
              <Link href={`${thumbnail}`} className={utilstyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilstyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
