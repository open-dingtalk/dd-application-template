import React from 'react';
import classnames from 'classnames';

import { getYear, times, getDateArray } from '../utils/utils';

import './Timeline.css';

const length = 26;

const arr_leng_26 = new Array(length).fill(null);

const n = (48 - length - 2) / 2;

const Timeline = ({ item }) => {
  return (
    <>
      <div className="timeline">
        {
          arr_leng_26.map((s, index) => {
            let disabled = false;
            let selected = false;
            const now = Date.now();
            const startHM = `${times[index + n * 2].content.split(' - ')[0]}:00`;
            const endHM = `${times[index + n * 2].content.split(' - ')[1]}:00`;
            if (new Date(...getDateArray(now, startHM)).getTime() < now) {
              disabled = true;
            }
            if (item.timeRanges) {
              item.timeRanges.forEach(range => {
                if (getYear(now) === getYear(range.endTime) && getYear(now) === getYear(range.startTime)) {
                  if (
                    new Date(...getDateArray(range.startTime, startHM)).getTime() >= range.startTime
                    && new Date(...getDateArray(range.endTime, endHM)).getTime() <= range.endTime
                  ) {
                    selected = true;
                  }
                }
              })
            }
            const slotClassname = classnames("slot", {
              "first": index === 0,
              "last": index === arr_leng_26.length - 1,
              "disabled": disabled,
              "selected": selected,
            })
            return (
              <div className="slots" key={index}>
                <div className={slotClassname} />
              </div>
            )
          })
        }
      </div>
      <div className="label">
        {
          arr_leng_26.map((s, index) => {
            const slotClassname = classnames("slot", {
              "first": index === 0,
              "last": index === arr_leng_26.length - 1,
            })
            return (
              <div className={slotClassname} key={index}>
                {index % 2 === 0 ? index / 2 + n : ''}
                {index === arr_leng_26.length - 1 ? (index + 1) / 2 + n : ''}
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default Timeline;
