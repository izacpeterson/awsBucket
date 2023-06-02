<script>
  let buttonMessage = "Upload to S3";
  async function handleSubmit() {
    buttonMessage = "Uploading...";
  }
</script>

<form method="POST" on:submit={handleSubmit} action="?/upload" enctype="multipart/form-data" class="flex flex-col space-y-4 items-start px-6">
  <!-- <input type="text" name="title" placeholder="Title" class="py-2 px-4 border border-gray-300 rounded-lg" /> -->
  <input type="file" name="file" multiple class="py-2 px-4 border border-gray-300 rounded-lg" />
  <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">{buttonMessage}</button>
</form>
