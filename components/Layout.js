import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "yuki enomoto";
export const siteTitle = "Next.js Sample Website";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
				<link rel="icon" href="/favicon.ico" />
				<title>{siteTitle}</title>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.png"
              className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">
						← Back to home
					</Link>
				</div>
			)}
    </div>
  );
}

export default Layout;
