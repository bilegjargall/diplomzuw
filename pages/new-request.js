import { useState } from 'react';
import styles from '../styles/NewRequest.module.css';

export default function NewRequest() {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Өргөдөл амжилттай илгээгдлээ!');
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Шинэ Өргөдөл Гаргах</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="type" className={styles.label}>Өргөдлийн төрөл</label>
          <select
            id="type"
            name="type"
            className={styles.select}
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Сонгоно уу</option>
            <option value="Чөлөө">Чөлөө</option>
            <option value="Тайлан">Тайлан</option>
            <option value="Гэрчилгээ">Гэрчилгээ</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>Огноо</label>
          <input
            type="date"
            id="date"
            name="date"
            className={styles.input}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Тайлбар</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
            placeholder="Тайлбар бичнэ үү..."
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="file" className={styles.label}>Файл хавсаргах</label>
          <input
            type="file"
            id="file"
            name="file"
            className={styles.input}
            onChange={handleChange}
          />
        </div>

        <div className={styles.buttons}>
          <button type="reset" className={`${styles.button} ${styles.cancel}`}>Цуцлах</button>
          <button type="submit" className={`${styles.button} ${styles.submit}`}>Илгээх</button>
        </div>
      </form>
    </div>
  );
}
