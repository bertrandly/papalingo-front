<script>
    import Loader from "../../../components/Loader.svelte";
    import {getChapterProgressionStats} from "$lib/quizzApi.js";
    import {Line} from "svelte-chartjs";
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from 'chart.js';

    /** @type {import('./$types').PageData} */
    export let data;
    let cp = getChapterProgressionStats(data.cp_id)
    let stats = {}
    cp.then((res) => {
        let dates = res.stats.map((d) => d.date)
        let values = res.stats.map((d) => d.rate)

        stats = {
            labels: dates,//['January', 'February', 'March', 'April', 'May', 'June', 'July'],

            datasets: [
                {
                    label: res.title,
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(225, 204,230, .3)',
                    borderColor: 'rgb(205, 130, 158)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(205, 130,1 58)',
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(0, 0, 0)',
                    pointHoverBorderColor: 'rgba(220, 220, 220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: values,
                },

            ],
        };
    })

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale
    );


</script>
<a class='btn' href="/progress">Back</a>
{#await cp}
    <Loader/>
{:then statLoaded }
    <section>
        <Line data={stats} options={{ responsive: true             }}/>
    </section>
{/await}