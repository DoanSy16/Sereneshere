import React from "react";
const t = ['p', 'giờ', 'ngày', 'tuần', 'tháng', 'năm'];
const week = ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'];
const timer = (timeInput) => {
    let timeOutput = '';
    // const date = new Date(timeInput);
    const date = new Date(timeInput);
    const now = new Date();
    const timeDifference = Math.abs(now.getTime() - date.getTime());
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)); // Số tháng giữa hai thời điểm
    if (minutes < 60) {
        timeOutput = `${minutes} ${t[0]}`;
    } else if (hours < 24) {
        timeOutput = `${hours} ${t[1]}`;
    } else if (days < 7) {
        timeOutput = `${days} ${t[2]}`;
    } else if (days < 30) {
        timeOutput = `${weeks} ${t[3]}`;
    } else {
        timeOutput = `${months} ${t[4]}`;
    }
    return timeOutput;

}
const timeYear = (timeInput) => {
    let timeOutput = '';
    const date = new Date(timeInput);
    const now = new Date();
    const years = now.getFullYear() - date.getFullYear();
    timeOutput = timer(timeInput);
    const check = parseInt(timeOutput.substring(0, timeOutput.indexOf(" ")));
    const type = timeOutput.substring(timeOutput.indexOf(" "), timeOutput.length);
    if (type != t[5] && check < 12) {
        return timeOutput;
    }
    return `${years} ${t[5]}`;
}



const customTimePost = (timeInput) => {
    let timeOutput = '';
    const date = new Date(timeInput);
    const now = new Date();
    const years = now.getFullYear() - date.getFullYear();
    if (years < 1) {
        timeOutput = timer(timeInput);
    } else {
        const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
        const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const year = date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear();
        timeOutput = `${day}-${month}-${year}`
    }
    return timeOutput;
}
const time_of_the_week = ({ timeInput }) => {
    let timeOut = '';
    const date = new Date(timeInput);
    const now = new Date();
    // console.log('now.getFullYear()-date.getFullYear(): '+date.getHours());
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    if (now.getFullYear() - date.getFullYear() >= 1) {
        timeOut = `NGÀY ${day} THÁNG ${month} NĂM ${date.getFullYear()} LÚC ${hours}:${minutes}`;
    }
    else {
        // Tìm ngày đầu tiên trong tuần (ngày chủ nhật)
        let firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now.getDay());

        // Tìm ngày cuối cùng trong tuần (ngày thứ bảy)
        let lastDayOfWeek = new Date(now);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

        // Định dạng ngày thành chuỗi
        let startDate = firstDayOfWeek.toISOString().slice(0, 10);
        let endDate = lastDayOfWeek.toISOString().slice(0, 10);
        if (now.getDay() - date.getDay() == 0) {
            timeOut = `Hôm nay LÚC ${hours}:${minutes}`;
        } else if (now.getDay() - date.getDay() == 1) {
            timeOut = `Hôm qua LÚC ${hours}:${minutes}`;
        } else  if (date >new Date(startDate) && date<new Date(endDate)){
            timeOut = `${week[date.getDay()]} LÚC ${hours}:${minutes}`;
        }else{
            timeOut = `NGÀY ${day} THÁNG ${month} LÚC ${hours}:${minutes}`;

        }
    }

    return timeOut;
}
const time_birthday =(timeInput)=>{
    const date = new Date(timeInput);
    return `Ngày ${date.getDate()} tháng ${date.getMonth()+1} năm ${date.getFullYear()}`;

}
const MemoizedTimeOfTheWeek = React.memo(time_of_the_week);

export { customTimePost, timer, timeYear, MemoizedTimeOfTheWeek,time_birthday }