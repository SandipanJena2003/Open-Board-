const upload = document.getElementById('upload');
let download = document.querySelector("#download");

// function uploadFile() {
//     // Get the file input element
//     const fileInput = document.querySelector('input[type="file"]');
//     // Get the selected file
//     const file = fileInput.files[0];
//     // Create a FileReader object
//     const reader = new FileReader();
//     // Read the file contents
//     reader.readAsDataURL(file);
//     // Handle the load event of the FileReader object
//     reader.onload = function() {
//       // The file contents are now available in the `reader.result` property
//       // You can perform any necessary actions with the file contents here
//     };
//   }
upload.addEventListener("change", function (_e) {
    let reader = new FileReader();

    reader.onload = function (_e) {
        // let content = createBox();
        let img = document.createElement("img");
        img.src = e.target.result;
        img.setAttribute("class", "uploaded-img");
        content.append(img);
    };

    //read the image file as a data URL.
    reader.readAsDataURL(upload.files[0]);
});
// upload.addEventListener("click", (e) => {

//     //   //Open file explorer
//       const input = document.createElement("input");
//       input.setAttribute("type", "file");
//       input.click();
//       input.addEventListener("change", (e) => {
//         const file = input.files[0];
//         let url = URL.createObjectURL(file);
//         let stickyCont = document.createElement("div");
//         stickyCont.setAttribute("class", "sticky-cont");
//         stickyCont.innerHTML = `
//         <div class="header-cont">
//             <div class="minimize"></div>
//             <div class="remove"></div>
//         </div>
//         <div class="note-cont">
//             <img src="${url}"/>
//         </div>
//         `;
//         createSticky(stickyTemplateHTML);
//     });
//     });
download.addEventListener("click", function (_e) {
    let a = document.createElement("a");
    let url = canvas.toDataURL("image/png");
    a.setAttribute("href", url);
    a.setAttribute("download", "file.png");
    a.click();
    a.remove();
})
// function createSticky(stickyTemplateHTML) {
//     let stickyCont = document.createElement("div");
//     stickyCont.setAttribute("class", "sticky-cont");
//     stickyCont.innerHTML = stickyTemplateHTML;
//     document.body.appendChild(stickyCont);
  
//     let minimize = stickyCont.querySelector(".minimize");
//     let remove = stickyCont.querySelector(".remove");
//     noteActions(minimize, remove, stickyCont);
  
//     stickyCont.onmousedown = function (event) {
//         dragAndDrop(stickyCont, event);
//     };
  
//     stickyCont.ondragstart = function () {
//         return false;
//     };
//   }
  