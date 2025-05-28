import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { capturePaypalPayment } from "@/store/order-slice";
import { useNavigate } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  console.log("USER DETAILS IN PAYPAL return---", userId);

  const token = params.get("token");
  const payerID = params.get("PayerID");
  useEffect(() => {
    // const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    if (token && payerID) {
      dispatch(capturePaypalPayment({ token, payerID })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          navigate("/shop/payment-success");
        }
      });
    }
  }, [token, payerID, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment.. please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}
export default PaypalReturnPage;
