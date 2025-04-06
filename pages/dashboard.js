
// dashboard.js (Ажилтны хяналтын самбар)
import styles from '../styles/dashboard.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ajiltan') {
      router.push('/login')
    }
  }, [session, status])

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Ажилтны Самбар</h2>
        <nav className={styles.nav}>
          <Link href="/dashboard">Нүүр</Link>
          <Link href="/requests">Миний өргөдөл</Link>
          <Link href="/new-request">Шинэ өргөдөл</Link>
          <Link href="/notifications">Мэдэгдэл</Link>
          <Link href="/settings">Тохиргоо</Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Тавтай морилно уу, {session?.user?.name || 'Ажилтан'}!</h1>
        </header>

        <section className={styles.stats}>
          <div className={styles.card}><h3>Нийт өргөдөл</h3><p>5</p></div>
          <div className={styles.card}><h3>Хүлээгдэж буй</h3><p>2</p></div>
          <div className={styles.card}><h3>Шийдвэрлэсэн</h3><p>3</p></div>
        </section>
      </main>
    </div>
  )
}