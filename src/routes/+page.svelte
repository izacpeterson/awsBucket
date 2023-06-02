<script>
  import Upload from "$lib/Upload.svelte";

  export let data;

  let urls = data.bucket;
</script>

<ul class="flex flex-col mt-4">
  {#each urls as url}
    <li class="mx-6 mb-2">
      <a href={url.url} class="text-blue-500 underline">{url.key.split("---")[0]}</a>
    </li>
  {/each}

  <Upload />
</ul>
