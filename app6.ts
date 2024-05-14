import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

// Note: 0.001 = 0
const womenData: any = [
    3.6, 4, 4.6, 6, 6.6, 7.1, 7.4, 7.4, 6.7, 7.2, 7.5, 7.4, 6.8, 5.3, 4.8, 3.3,
    2.3, 1.5, 0.6, 0.1, 0.001,
];

const menData: any = [
    3.7, 4.1, 5.1, 6.7, 7.5, 7.4, 8, 7.1, 5.9, 6.3, 7.6, 7.6, 6.4, 5.4, 4.1, 3,
    2.1, 1.3, 0.6, 0.1, 0.001,
];

Chart.register(ChartDataLabels);

var data = {
    labels: [],
    datasets: [
        {
            label: "WOMEN",
            stack: "Stack 0",
            backgroundColor: "#CA6DFF4D",
            data: [],
            borderRadius: 10,
            // borderSkipped: false,
            borderColor: "#CA6DFF",
            borderWidth: 2,
        },
        {
            label: "MEN",
            stack: "Stack 0",
            backgroundColor: "#FF5C5F4D",
            data: [],
            borderRadius: 10,
            // borderSkipped: false,
            borderColor: "#FF5C5F",
            borderWidth: 2,
        },
    ],
};

// const generateSemiRandomAge = (i) => {
//     let age = Number(Math.random() * 5) - (50 - i) / 100;
//     if (i < 70) {
//         age += 2;
//     }
//     console.log(age);

//     age = Math.abs(age);

//     if (age < 2) {
//         age += 2;
//     }

//     return age;
// };

// Generate labels and data
for (let age = 0; age <= 100; age += 5) {
    let label: never | string;

    if (age === 100) {
        label = "100 years and over";
    } else {
        label = age + " to " + (age + 4) + " years";
    }

    data.labels.unshift(label as never);

    console.log(data.labels);

    data.datasets[0].data.unshift(-womenData[age / 5] as never);
    data.datasets[1].data.unshift(menData[age / 5] as never);
}

var options = {
    indexAxis: "y",
    plugins: {
        datalabels: {
            display: true,
            anchor: (context: any) => {
                const value = context.dataset.data[context.dataIndex];
                return value < 0 ? "start" : "end";
            },
            align: (context: any) => {
                const value = context.dataset.data[context.dataIndex];
                return value < 0 ? "start" : "end";
            },
            padding: 4,
            color: "#647882",
            font: {
                family: "sans-serif",
                size: 14,
                style: "normal",
            },
            formatter: (value: number) => {
                return Math.abs(value).toFixed(2);
            },
        },
        tooltip: {
            callbacks: {
                label: (c: any) => {
                    const value = Number(c.raw);
                    const positiveOnly = value < 0 ? -value : value;
                    return `${c.dataset.label}: ${positiveOnly.toString()}`;
                },
            },
        },
        legend: {
            display: true,
            position: "top",
            color: "#00323F",
        },
        subtitle: {
            display: true,
            text: "Age range",
            padding: {
                bottom: 10,
            },
            rotation: 270,
            position: "left",
            font: {
                size: 16,
                family: "sans-serif",
                weight: "bold",
                lineHeight: 1.2,
            },
            color: "#00323F",
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Percentage of population",
                color: "#00323F",
                font: {
                    size: 16,
                    family: "sans-serif",
                    weight: "bold",
                    lineHeight: 1.2,
                },
                padding: 14,
            },
            ticks: {
                font: {
                    size: 14,
                    family: "sans-serif",
                    weight: "medium",
                    lineHeight: 1.2,
                },
                color: "#00323F",
                stepSize: 1,
                callback: (v: number) => (v < 0 ? -v : v),
            },
            min: -10,
            max: 10,
        },
        y: {
            ticks: {
                font: {
                    size: 14,
                    family: "sans-serif",
                    weight: "medium",
                    lineHeight: 1.2,
                },
                color: "#00323F",
                stepSize: 1,
            },
        },
    },
};

document.addEventListener("DOMContentLoaded", function () {
    var ctx = (
        document.getElementById("myChart") as HTMLCanvasElement
    ).getContext("2d");
    new Chart(ctx as any, {
        type: "bar",
        options: options as any,
        data: data,
    });
});
