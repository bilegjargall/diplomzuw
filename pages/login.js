import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import styles from '../styles/Login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      alert('Та бүх талбарыг бөглөнө үү!')
      return
    }

    // 🟢 NextAuth login
    const res = await signIn('credentials', {
      redirect: false,
      email: username,
      password: password,
    })

    if (res.ok) {
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()
      const role = session?.user?.role

      // 🧠 Role-оос хамаарч самбар руу чиглүүлнэ
      if (role === 'admin' || role === 'udirdlaga') {
        router.push('/admindashboard')
      } else {
        router.push('/dashboard')
      }
    } else {
      alert('Нэвтрэх мэдээлэл буруу байна!')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>🔥</div>
        <h2 className={styles.title}>Нэвтрэх</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username">Имэйл</label>
          <input
            type="text"
            id="username"
            placeholder="example@email.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Нууц үг</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.row}>
            <label><input type="checkbox" /> Сануулах</label>
            <a href="#">Нууц үг мартсан уу?</a>
          </div>

          <button type="submit" className={styles.loginBtn}>Нэвтрэх</button>

          <div className={styles.separator}>эсвэл</div>

          <p className={styles.registerLink}>
            Бүртгэл байхгүй юу? <a href="#">Бүртгүүлэх</a>
          </p>
        </form>
      </div>
    </div>
  )
}
