import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { headers } from '@/next.config'
import Layout from "../components/Layout"
import { getPostsData } from '../lib/post'

const inter = Inter({ subsets: ['latin'] })

//SSG(静的レンダリング)の場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //IDとデータを取得する
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    }
  };
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>
          えんじにあのほーむぺーじ
        </p>
      </section>

      <section >
        <h2>最近の投稿</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id,title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
                </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )

}
