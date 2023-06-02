<script>
  import Upload from "$lib/Upload.svelte";

  export let data;

  let urls = data.bucket;

  let displayType = "fileName";

  function handleDisplayTypeChange(event) {
    displayType = event.target.value;
  }
</script>

<select class="mb-4" on:change={handleDisplayTypeChange}>
  <option value="download">Download Link</option>
  <option value="image">Image</option>
</select>

<ul class="flex flex-col mt-4">
  {#each urls as url}
    <li class="mx-6 mb-2">
      {#if displayType === "fileName"}
        <a href={url.url} class="text-blue-500 underline">{url.key}</a>
      {:else if displayType === "image"}
        <img src={url.url} alt="" class="w-96" />
        <a href={url.url} class="text-blue-500 underline">Download</a>
      {/if}
    </li>
  {/each}

  <Upload />
</ul>
