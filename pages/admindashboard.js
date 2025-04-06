import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/admindashboard.module.css'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'udirdlaga')) {
      router.push('/login')
    }
  }, [session, status])

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Удирдлага</h2>
        <nav className={styles.nav}>
          <a href="#">Өргөдөл хянах</a>
          <a href="#">Ажилтнууд</a>
          <a href="#">Тохиргоо</a>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Удирдлагын Хяналтын Самбар</h1>
        </header>

        <section className={styles.reviewSection}>
          <div className={styles.card}>
            <h3>Хүлээгдэж буй өргөдлүүд</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th><th>Ажилтан</th><th>Төрөл</th><th>Огноо</th><th>Төлөв</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#2025-001</td><td>С.Болормаа</td><td>Чөлөө</td><td>2025.01.15</td><td>Хүлээгдэж буй</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

/* styles/AdminDashboard.module.css */
