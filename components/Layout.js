import Head from "next/head";
import styles from "./layout.module.css";
import utilstyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Aberi";
export const siteTitle = "Next.js BLOG";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/profile.png"
              className={`${utilstyles.borderCircle} ${styles.headerHomeImage}`}
            ></img>
            <h1 className={utilstyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/profile.png"
              className={`${utilstyles.borderCircle} ${styles.headerImage}`}
            ></img>
            <h1 className={utilstyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
