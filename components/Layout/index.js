import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LoadingScreen from '../LoadingScreen/loadingScreen';
import { frontService } from '../../_services/front.services';
import {
  menuSave,
  mainCategory,
  mainLocation,
} from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveReturn } from '../../responsiveCheck';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

function Layout({ children }) {
  const [serving, setServing] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const cart = useSelector((state) => state.cardAdd?.cart);
  const dataloctions = useSelector((state) => state.loctions);
  const router = useRouter();
  const dispatch = useDispatch();
  const val = responsiveReturn('D', 'M', 991);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setServing(dataloctions);
    setCartTotal(cart);
    localStorage.setItem('devise', val);
    console.log('hello');
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  React.useEffect(() => {
    frontService.allSlider().then(
      (res) => {
        if (res.status === 'success') {
          dispatch(menuSave(res.slider_images));
        } else {
          console.log('Something went wrong !!');
        }
      },
      (error) => {
        console.log('Something went wrong !!');
      }
    );

    frontService.maincategory().then(
      (res) => {
        if (res.status === 'success') {
          dispatch(mainCategory(res.maincategory));
        } else {
          console.log('Something went wrong !!');
        }
      },
      (error) => {
        console.log('Something went wrong !!');
        //toast.error("Something went wrong !!", "Fashion Store");
      }
    );

    frontService.locationall().then(
      (res) => {
        if (res.status === 'success') {
          dispatch(mainLocation(res.locations));
        } else {
          console.log('Something went wrong !!');
        }
      },
      (error) => {
        console.log('Something went wrong !!');
        //toast.error("Something went wrong !!", "Fashion Store");
      }
    );
  }, []);

  return (
    <>
      <ToastContainer />

      <>
        <div className="allsection">{children}</div>
        {router.pathname === '/checkout' ? (
          ''
        ) : (
          <Footer data={serving} cart={cartTotal} />
        )}
      </>
    </>
  );
}
export default Layout;
