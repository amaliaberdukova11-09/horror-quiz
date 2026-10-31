const URL = 'https://script.google.com/macros/s/AKfycbwtpoL-zFDcheiQ9Hv3k_pWqy8Q1B91w3unowJIbud8MG6JAYzqH5Kop6XOBF9XucpmXg/exec'; 

function submitQuiz() {
    // Правильные ответы
    const answers = {
        q1: 'B', q2: 'B', q3: 'C', q4: 'B', q5: 'B',
        q6: 'B', q7: 'A', q8: 'B', q9: 'B', q10: 'B'
    };

    let score = 0;
    
    // Проверка ответов
    for (let i = 1; i <= 10; i++) {
        let selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === answers[`q${i}`]) {
            score++;
        }
    }

    // Логика выживания
    let resultText = "";
    let resultColor = "";

    if (score >= 8) {
        resultText = `You scored ${score}/10.\nYou are a true horror survivor! You escaped! 🚗💨`;
        resultColor = "#4ade80"; // Зеленый
    } else if (score >= 5) {
        resultText = `You scored ${score}/10.\nYou barely survived, but you got some scars. Be careful! 🔪`;
        resultColor = "#fbbf24"; // Желтый
    } else {
        resultText = `You scored ${score}/10.\nYou made too many mistakes... You didn't survive the night. 💀`;
        resultColor = "#ef4444"; // Красный
    }

    // Вывод результата
    const resultElement = document.getElementById('result');
    resultElement.innerText = resultText;
    resultElement.style.color = resultColor;

    // Отправка в Google Таблицу
    if (URL !== 'ВАША_ССЫЛКА_СЮДА') {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                score: score,
                total: 10,
                date: new Date().toLocaleString()
            })
        })
        .then(response => response.text())
        .then(data => console.log('Успешно отправлено:', data))
        .catch(error => console.error('Ошибка:', error));
    }
}