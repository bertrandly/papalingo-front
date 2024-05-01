<script>

    import {getLessonProgressOfUser} from "$lib/quizzApi.js";
    import Loader from "../../components/Loader.svelte";

    let progressions = getLessonProgressOfUser();

</script>
{#await progressions}
    <Loader/>
{:then progresses}
    <div class="overflow-x-auto">
        <table class="table table-zebra">
            <!-- head -->
            <thead>
            <tr>
                <th>Active?</th>
                <th>Chapter</th>
                <th>Progress</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            {#each progresses as progress}
                <tr>
                    <td>{#if progress.isActive}<div class="badge badge-primary">Active</div>{/if}</td>
                    <th>{progress.chapter.lesson.title} {progress.chapter.title?' - '+progress.chapter.title:''} </th>
                    <td>
                        <progress class="progress progress-success w-56" value="{progress.rate}" max="100"></progress> <small>{progress.rate}%</small>
                    </td>
                </tr>
            {/each}

            </tbody>
        </table>
    </div>

{/await}
