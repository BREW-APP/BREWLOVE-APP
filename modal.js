$(".show").on("click", function() {
  $(".mask").addClass("active");
});

// Function for close the Modal

function closeModal() {
  $(".mask").removeClass("active");
}

// Call the closeModal function on the clicks/keyboard

$(".close, .mask").on("click", function() {
  closeModal();
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    closeModal();
  }
});

document.getElementById("no").onclick = function() {
  if (this.checked) {
    location.href =
      "https://3.bp.blogspot.com/-FzoQl3NKyKs/VjN4QasIZpI/AAAAAAAAAIA/ZajN2vS2vO4/s1600/Meme.jpg";
  }
};

document.getElementById("yes").onclick = function() {
  if (this.checked) {
    location.href = "index.html";
  }
};

function deleteItems() {
  localStorage.clear();
}
