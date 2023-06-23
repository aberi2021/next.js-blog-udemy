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
          私はコーダーです。ウェブアクセシビリティに興味があります。Next.jsを勉強しています。
        </p>
        <p className={utilstyles.paragrafMd}>
          このサイトはUdemyの
          <a href="https://www.udemy.com/course/nextjs-microblog-for-beginner/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.JA_cc.JP&utm_content=deal4584&utm_term=_._ag_107181210924_._ad_452531407122_._kw__._de_c_._dm__._pl__._ti_dsa-930814701079_._li_9166161_._pd__._&matchtype=&gclid=CjwKCAjwhdWkBhBZEiwA1ibLmOaBPhE0kMloE-3xHy8L_piYoF3XbN8H7UOPfF0VtoraUxKibVl-1xoCuTcQAvD_BwE">
            【Next.js入門】ReactフレームワークのNext.jsでマイクロブログを構築しながら基礎と本質を学ぶ講座
          </a>
          の勉強用です。
          <br />
          写真や文章は講座で提供されたものです。
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
