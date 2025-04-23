if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  
  // HÃ m thÃªm sáº£n pháº©m vÃ o giá» hÃ ng
  function addToCart(element) {
    // Láº¥y thÃ´ng tin sáº£n pháº©m tá»« container
    const productContainer = element.closest(".bg_sp");
  
    // Láº¥y thÃ´ng tin sáº£n pháº©m
    const imgSrc = productContainer.querySelector(".img-baosp img").src;
    const productName = productContainer
      .querySelector(".text-sp b")
      .innerText.trim();
    const productPrice = productContainer
      .querySelector(".price b")
      .innerText.trim();
    const specs = productContainer.querySelector(".thongso p").innerText.trim();
  
    // Táº¡o Ä‘á»‘i tÆ°á»£ng sáº£n pháº©m
    const product = {
      id: generateProductId(productName),
      imgSrc: imgSrc,
      name: productName,
      price: productPrice,
      specs: specs,
      quantity: 1,
    };
  
    // Láº¥y giá» hÃ ng hiá»‡n táº¡i
    const cart = JSON.parse(localStorage.getItem("cart"));
  
    // Kiá»ƒm tra sáº£n pháº©m Ä‘Ã£ tá»“n táº¡i trong giá» hÃ ng chÆ°a
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex > -1) {
      // Sáº£n pháº©m Ä‘Ã£ tá»“n táº¡i, tÄƒng sá»‘ lÆ°á»£ng
      cart[existingProductIndex].quantity += 1;
    } else {
      // ThÃªm sáº£n pháº©m má»›i vÃ o giá» hÃ ng
      cart.push(product);
    }
  
    // LÆ°u giá» hÃ ng Ä‘Ã£ cáº­p nháº­t vÃ o localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Hiá»ƒn thá»‹ thÃ´ng bÃ¡o Ä‘Ã£ thÃªm vÃ o giá» hÃ ng
    showAddToCartConfirmation(productName);
  }
  
  // Táº¡o ID sáº£n pháº©m Ä‘Æ¡n giáº£n dá»±a trÃªn tÃªn
  function generateProductId(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .substring(0, 30);
  }
  
  // Hiá»ƒn thá»‹ xÃ¡c nháº­n khi thÃªm sáº£n pháº©m
  function showAddToCartConfirmation(productName) {
    // Táº¡o pháº§n tá»­ thÃ´ng bÃ¡o
    const notification = document.createElement("div");
    notification.classList.add("cart-notification");
    notification.innerHTML = `
          <div class="notification-content">
              <i class="fa-solid fa-check"></i>
              <span>ÄÃ£ thÃªm "${productName.substring(
                0,
                30
              )}..." vÃ o giá» hÃ ng</span>
          </div>
      `;
  
    // ThÃªm CSS cho thÃ´ng bÃ¡o
    const style = document.createElement("style");
    style.innerHTML = `
          .cart-notification {
              position: fixed;
              top: 20px;
              right: 20px;
              background-color: #4CAF50;
              color: white;
              padding: 15px;
              border-radius: 5px;
              z-index: 1000;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
              animation-fill-mode: forwards;
          }
          
          .notification-content {
              display: flex;
              align-items: center;
          }
          
          .notification-content i {
              margin-right: 10px;
              font-size: 18px;
          }
          
          @keyframes slideIn {
              from {
                  transform: translateX(100%);
                  opacity: 0;
              }
              to {
                  transform: translateX(0);
                  opacity: 1;
              }
          }
          
          @keyframes fadeOut {
              from {
                  opacity: 1;
              }
              to {
                  opacity: 0;
                  display: none;
              }
          }
      `;
  
    // ThÃªm vÃ o tÃ i liá»‡u
    document.head.appendChild(style);
    document.body.appendChild(notification);
  
    // XÃ³a thÃ´ng bÃ¡o sau 3 giÃ¢y
    setTimeout(() => {
      notification.remove();
    }, 1000);
  
    // Cáº­p nháº­t sá»‘ lÆ°á»£ng giá» hÃ ng náº¿u cÃ³
    updateCartCounter();
  }
  
  // Cáº­p nháº­t sá»‘ lÆ°á»£ng hiá»ƒn thá»‹ trÃªn biá»ƒu tÆ°á»£ng giá» hÃ ng
  function updateCartCounter() {
    // Láº¥y giá» hÃ ng hiá»‡n táº¡i
    const cart = JSON.parse(localStorage.getItem("cart"));
  
    // TÃ­nh tá»•ng sá»‘ lÆ°á»£ng
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
    // TÃ¬m biá»ƒu tÆ°á»£ng giá» hÃ ng trong header
    const cartIcon = document.querySelector("#top-tops-topright a:nth-child(3)");
  
    if (cartIcon) {
      // Kiá»ƒm tra xem Ä‘Ã£ cÃ³ bá»™ Ä‘áº¿m chÆ°a
      let counter = cartIcon.querySelector(".cart-counter");
  
      if (!counter && totalItems > 0) {
        // Táº¡o bá»™ Ä‘áº¿m
        counter = document.createElement("span");
        counter.classList.add("cart-counter");
        cartIcon.appendChild(counter);
  
        // ThÃªm CSS cho bá»™ Ä‘áº¿m
        const style = document.createElement("style");
        style.innerHTML = `
                  .cart-counter {
                      position: absolute;
                      top: -8px;
                      right: -8px;
                      background-color: red;
                      color: white;
                      border-radius: 50%;
                      width: 18px;
                      height: 18px;
                      font-size: 12px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                  }
                  
                  #top-tops-topright a {
                      position: relative;
                  }
              `;
        document.head.appendChild(style);
      }
  
      // Cáº­p nháº­t vÄƒn báº£n cá»§a bá»™ Ä‘áº¿m hoáº·c xÃ³a náº¿u trá»‘ng
      if (counter) {
        if (totalItems > 0) {
          counter.textContent = totalItems;
        } else {
          counter.remove();
        }
      }
    }
  }
  
  // ThÃªm sá»± kiá»‡n click cho táº¥t cáº£ cÃ¡c nÃºt thÃªm vÃ o giá» hÃ ng
  document.addEventListener("DOMContentLoaded", function () {
    // ThÃªm sá»± kiá»‡n click vÃ o táº¥t cáº£ cÃ¡c nÃºt "ThÃªm vÃ o giá» hÃ ng" (btn_sp)
    const addToCartButtons = document.querySelectorAll(".a-them");
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // NgÄƒn cháº·n hÃ nh vi máº·c Ä‘á»‹nh cá»§a tháº» a
        addToCart(this);
      });
    });
  
    // Khá»Ÿi táº¡o bá»™ Ä‘áº¿m giá» hÃ ng khi táº£i trang
    updateCartCounter();
  });