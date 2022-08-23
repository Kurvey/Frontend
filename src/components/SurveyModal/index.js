import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';

import styles from './survey-modal.module.css';
import {surveySelector} from '../../features/survey/surveySlice';

export default function SurveyModal({close}) {
  const [lifeStyles, setLifeStyles] = useState(new Set());

  const {register, handleSubmit} = useForm();
  const surveyList = useSelector(surveySelector).data;

  const submitForm = (data) => {
    const req = {
      ...data,
      select: surveyList
    }
    close();
  };

  const lifeStyleOnClick = id => {
    const buttonGroup = document.querySelectorAll('.lifeStyleButton');
    const colors = ['#483674', '#674ea7', '#b3a6d3'];
    // console.log('buttonGroup', buttonGroup)

    const fakeItems = lifeStyles;

    if (fakeItems.has(id - 1)) fakeItems.delete(id - 1);
    else if (fakeItems.size === 3) return false;
    else fakeItems.add(id - 1);

    setLifeStyles(fakeItems);

    if (lifeStyles) {
      let colorIndex = 0;

      lifeStyles.forEach(index => {
        const ele = buttonGroup[index];
        ele.style.backgroundColor = colors[colorIndex];
        ele.style.color = '#fff';

        colorIndex++;
      });

      buttonGroup.forEach((ele, index) => {
        if (!lifeStyles.has(index)) {
          ele.style.backgroundColor = '#fff';
          ele.style.color = '#000';
          ele.style.border = '1.5px solid #929292';
        }
      });
    }
  };

  // const LifeStyleItem = ({key, item, type}) => {
  //   return (
  //     <button
  //       onClick={() => lifeStyleOnClick(item.id)}
  //       className="lifeStyleButton"
  //     >
  //       <img src={item.imageUrl} alt={item.question + '일러스트'} />
  //       <p>{item.question}</p>
  //     </button>
  //   );
  // };

  return (
    <div id="myModal" className={styles.modal}>
      <form onSubmit={handleSubmit(submitForm)} className={styles.modalContent}>
        <div className={styles.inputBox}>
          가족은 구성원이 몇 명인가요?
          <input
            type="number"
            className={styles.inputNumber}
            {...register('numberOfFamily')}
            required
          />
          명
        </div>
        <div className={styles.inputBox}>
          영유아 자녀가 있나요?
          <input
            type="checkbox"
            id="check1"
            {...register('hasBaby')}
            required
          />
          <label htmlFor="check1"></label>
        </div>
        <div className={styles.inputBox}>
          반려 생물이 있나요?
          <div className={styles.checkBoxGroup}>
            <div>
              🐶 강아지
              <input
                type="checkbox"
                id="dog"

               {...register('hasDog')}
              />
              <label htmlFor="dog"></label>
            </div>
            <div>
              😺 고양이
              <input
                type="checkbox"
                id="cat"
                {...register('hasCat')}
              />
              <label htmlFor="cat"></label>
            </div>
            <div>
              🌿 반려식물
              <input
                type="checkbox"
                id="plant"
                {...register('hasPlant')}
              />
              <label htmlFor="plant"></label>
            </div>
          </div>
        </div>
        <div className={styles.inputBox}>
          자신의 생활과 가장 관련 있는 주제를 순서대로 3가지 골라주세요.
          {/* 버튼 OR 체크박스 */}
          <div className={styles.lifeStyleBox}>
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[0].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[0].imageUrl}
                alt={surveyList[0].question + '일러스트'}
              />
              <p>{surveyList[0].question}</p>
            </button>{' '}
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[1].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[1].imageUrl}
                alt={surveyList[1].question + '일러스트'}
              />
              <p>{surveyList[1].question}</p>
            </button>{' '}
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[2].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[2].imageUrl}
                alt={surveyList[2].question + '일러스트'}
              />
              <p>{surveyList[2].question}</p>
            </button>{' '}
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[3].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[3].imageUrl}
                alt={surveyList[3].question + '일러스트'}
              />
              <p>{surveyList[3].question}</p>
            </button>
          </div>
          <div className={styles.lifeStyleBox}>
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[4].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[4].imageUrl}
                alt={surveyList[4].question + '일러스트'}
              />
              <p>{surveyList[4].question}</p>
            </button>{' '}
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[5].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[5].imageUrl}
                alt={surveyList[5].question + '일러스트'}
              />
              <p>{surveyList[5].question}</p>
            </button>{' '}
            <button
              type="button"
              onClick={() => lifeStyleOnClick(surveyList[6].id)}
              className="lifeStyleButton"
            >
              <img
                src={surveyList[6].imageUrl}
                alt={surveyList[6].question + '일러스트'}
              />
              <p>{surveyList[6].question}</p>
            </button>
          </div>
        </div>
        <button type="submit" className={styles.save}>
          저장
        </button>
      </form>
    </div>
  );
}
