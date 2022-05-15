import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {

  const { pathname } = useLocation();
 // console.log(pathname)

  let heder = document.getElementById("heder");
  if (heder) {

    heder.className = "zaglavlje";

    let x = heder.querySelector('.active');
   // console.log(x)
    if (x) {
      x.classList.remove('active')
    //  console.log(x)
    }

    x = heder.querySelector('.'+pathname.substring(1));
  //  console.log(x)
    if (x) {
      x.classList.add('active')
     // console.log(x)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

