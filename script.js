document.addEventListener("DOMContentLoaded", function () {
  const runButton = document.getElementById("run-button");
  const copyButton = document.getElementById("copy-button");
  const saveButton = document.getElementById("save-button");
  const lockButton = document.getElementById("lock-button");
  const codeEditor = document.getElementById("code-editor");
  const inputBox = document.getElementById("input-box");
  const output = document.getElementById("output");
  const themeButton = document.getElementById("theme-button");

  let isLocked = false;
  let isDarkTheme = false;

  themeButton.addEventListener("click", function () {
    // Toggle between light and dark themes
    isDarkTheme = !isDarkTheme;
    document.body.className = isDarkTheme ? "dark" : "light";
  });

  copyButton.addEventListener("click", function () {
    if (isLocked) {
      alert("Please unlock the editor to copy the code.");
      return;
    }
    const textToCopy = codeEditor.value;
    navigator.clipboard
      .writeText(textToCopy)
      .then(function () {
        alert("Code copied to clipboard");
      })
      .catch(function (err) {
        console.error("Copy failed: ", err);
      });
  });

  saveButton.addEventListener("click", function () {
    if (isLocked) {
      alert("Please unlock the editor to save the code.");
      return;
    }
    const textToSave = codeEditor.value;
    const blob = new Blob([textToSave], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "code.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });

  lockButton.addEventListener("click", function () {
    isLocked = !isLocked; // Toggle the lock state
    lockButton.textContent = isLocked ? "Unlock" : "Lock";
    lockButton.classList.toggle("unlocked");
    lockButton.classList.toggle("locked");
    codeEditor.disabled = isLocked; // Disable the textarea when locked
  });

  runButton.addEventListener("click", function () {
    // Execute the code and display the output
    if (isLocked) {
      alert("Please unlock the editor to run the code.");
      return;
    }

    const codeToRun = codeEditor.value;
    const userInput = inputBox.value;

    try {
      // Clear previous output
      output.textContent = "";

      // Create a function from the code and execute it
      const executeCode = new Function("input", codeToRun);
      const result = executeCode(userInput);

      // Display the output
      output.textContent = result !== undefined ? result : "No output";
    } catch (error) {
      // Display any runtime error
      output.textContent = `Error: ${error.message}`;
    }
  });
});
