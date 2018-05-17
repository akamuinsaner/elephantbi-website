import React from 'react';
import uuid from 'uuid'
import styles from './index.less'

const leftImg = { height: '350px', width: '250px' }
const rightImg = { height: '350px', width: '500px' }

const HomeIntroduceItem = ({ section }) => {
  const { title, subTitle, lists, type, backImg } = section
  return (
    <div
      className={styles.container}
      style={type === 1 ? { backgroundColor: '#EAEEFE' } : null}
    >
      <div className={styles.title}>{title}</div>
      {
        type === 0 ? (
          <div className={styles.content}>
            <div className={styles.introduceSection}>
              <div className={styles.subTitle}>{subTitle}</div>
              <div className={styles.listContent}>
                <ul>
                  {
                    lists.map(list => (<li key={uuid()}>{list}</li>))
                  }
                </ul>
              </div>
            </div>
            <div className={styles.backImgSection}>
              <img alt="" src={backImg} style={type === 0 ? rightImg : leftImg} />
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.backImgSection}>
              <img alt="" src={backImg} style={type === 0 ? rightImg : leftImg} />
            </div>
            <div className={styles.introduceSection}>
              <div className={styles.subTitle}>{subTitle}</div>
              <div className={styles.listContent}>
                <ul>
                  {
                    lists.map(list => (<li key={uuid()}>{list}</li>))
                  }
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default HomeIntroduceItem