import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useRouter } from "next/router";
import { renderNoData } from "./RenderQ";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { calcPackageCost, checkCouponStatus } from "@/lib/utils";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import Modal from './ui/modal';
import Snack from './ui/Snack';
import Button from './ui/button';
import Space from './ui/Space';

const BookingModalContent = ({ courseQ, prevCourseQ }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const { profileId } = router.query;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const [theCourse, setTheCourse] = useState(null);
  const [price, setPrice] = useState(0);
  const [priceWithoutDiscount, setPriceWithoutDiscount] = useState(0);
  const [numberOfSessions, setNumberOfSessions] = useState(20);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState({ amount: 0, percentage: 0, message: "" });

  useEffect(() => {
    if (prevCourseQ.data && prevCourseQ.data.length > 0) {
      setTheCourse(prevCourseQ.data[0]);
    }
  }, [prevCourseQ.data]);

  const [addedRecord, setAddedRecord] = useState(null);

  const handlePaymentSuccess = async () => {
    const now = new Date();
    const dateTimeString = now.toISOString().substring(0, 16);
    if (price !== priceWithoutDiscount) {
      const paymentByPayer = {
        date: dateTimeString,
        payerId: theCourse.payerId,
        amountBeforeDiscountsInCAD: priceWithoutDiscount,
        method: "Website",
        amountActuallyPaidInCAD: price,
        couponId: coupon[0].id,
      };
      const { data, error: paymentByPayerError } = await supabase
        .from("paymentByPayer")
        .insert(paymentByPayer)
        .select();
      if (paymentByPayerError) {
        throw new Error(paymentByPayerError.message);
      }

      const usedCoupon = coupon[0];
      usedCoupon.condition.usedCount += 1;
      usedCoupon.condition.usedUser.push(userMeQ.data.payer.id);
      const { error } = await supabase
        .from("coupon")
        .update({ condition: usedCoupon.condition })
        .eq("code", usedCoupon.code);

      if (error) {
        throw new Error(error.message);
      }
    } else {
      const paymentByPayer = {
        date: dateTimeString,
        payerId: theCourse.payerId,
        amountBeforeDiscountsInCAD: price,
        method: "Website",
        amountActuallyPaidInCAD: price,
      };
      const { data, error: paymentByPayerError } = await supabase
        .from("paymentByPayer")
        .insert(paymentByPayer)
        .select();
      if (paymentByPayerError) {
        throw new Error(paymentByPayerError.message);
      }
    }

    const packagePurchased = {
      courseId: theCourse.id,
      expertiseId: theCourse.teacher.expertise[0].id,
      datePackagePurchased: dateTimeString,
      numberOfSessions,
    };

    const { data: packageData, error: packageError } = await supabase
      .from("packagePurchased")
      .insert(packagePurchased)
      .select();
    if (packageError) {
      throw new Error(packageError.message);
    }
    setAddedRecord(theCourse);
  };

  const now = new Date();
  const dateTimeString = now.toISOString().substring(0, 16);

  const onApplyCoupon = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("coupon").select(`id, code, condition`).eq("code", couponCode);
    if (error) {
      console.error(error);
    }

    setCoupon(data);
    setCouponStatus(checkCouponStatus(data, userMeQ.data));
  };

  useEffect(() => {
    if (theCourse) {
      const newPrice = calcPackageCost(theCourse, numberOfSessions);
      setPriceWithoutDiscount(newPrice);
      if (couponStatus.amount > 0) {
        setPrice(newPrice - couponStatus.amount);
      } else if (couponStatus.percentage > 0) {
        setPrice(newPrice * (1 - couponStatus.percentage / 100));
      } else {
        setPrice(newPrice);
      }
    }
  }, [numberOfSessions, couponStatus, theCourse]);

  if (prevCourseQ.data && prevCourseQ.data.length === 0) {
    return (
      <>
        <h2 className="H2 mb-4">{t("tutors:book.title")}</h2>
        <Snack variant='info' >

          <p className="">
            You need to get an intro session for the course first. Please click on the Free Intro Session button and
            book a free session.
          </p>
        </Snack>
        <Space size='h-3' />
          <Modal.Close className='w-full'>
            <Button variation='ghost' width='parent'>
            Ok, Got it.
            </Button>
            </Modal.Close>
      </>
    );
  }

  return (
    <>
      <h2 className="H3">{t("tutors:book.title")}</h2>
      {renderNoData(courseQ) ?? renderNoData(userMeQ) ?? renderNoData(prevCourseQ) ?? (
        <>
          <p>
            {t("tutors:book.tutor")}:{" "}
            {locale === "fa" ? getFullNameFa(courseQ.data.teacher.user) : getFullName(courseQ.data.teacher.user)},{" "}
            {t("tutors:book.subject")}: {locale === "fa" ? courseQ.data.topic.nameFa : courseQ.data.topic.name}
          </p>
          {!addedRecord && (
            <>
              <label htmlFor="course">
                Select the course you want to book
                <select
                  name="course"
                  required
                  value={prevCourseQ.data.findIndex((pc) => pc.id === theCourse?.id)}
                  onChange={(e) => setTheCourse(prevCourseQ.data[parseInt(e.target.value)])}
                >
                  {prevCourseQ.data.map((pc, i) => {
                    return (
                      <option key={pc.id} value={i}>
                        Students:{" "}
                        {Array.isArray(pc.courseStudent) &&
                          pc.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ")}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label htmlFor="numberOfSessions">
                {t("tutors:book.numberOfSessions")}
                <select
                  name="numberOfSessions"
                  required
                  value={numberOfSessions}
                  onChange={(e) => setNumberOfSessions(parseInt(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={12}>12</option>
                  <option value={20}>20</option>
                </select>
              </label>

              <label htmlFor="couponCode">
                Coupon Code
                <input
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  value={couponCode}
                  onChange={(e) => {
                    e.preventDefault();
                    setCouponCode(e.target.value);
                  }}
                />
                <button onClick={(e) => onApplyCoupon(e)}>Apply Coupon</button>
                <p className={`${couponStatus.message === "Coupon is valid" ? "c-green11" : "c-red11"}`}>
                  {couponStatus.message}
                </p>
              </label>

              <p>
                {t("tutors:book.cost")}: ${price}
              </p>
              <div className="grid justify-center items-center h-full">
                <PaymentForm
                  applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
                  cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    console.log("verifiedBuyer:", verifiedBuyer);
                    console.log("token:", token);
                    try {
                      const response = await fetch("/api/pay", {
                        method: "POST",
                        headers: {
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                          sourceId: token.token,
                          amount: price,
                        }),
                      });
                      console.log(await response.json());
                      if (!response.ok) {
                        throw new Error("Payment was not successful");
                      }
                      handlePaymentSuccess()
                    } catch (error) {
                      console.error("Payment processing error: ", error);
                    }
                  }}
                  locationId="L8YB0FFJPKQ4N"
                >
                  <CreditCard
                    buttonProps={{
                      css: {
                        backgroundColor: "#F76808",
                        fontSize: "14px",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#F76808",
                        },
                      },
                    }}
                  />
                </PaymentForm>
              </div>
            </>
          )}

          {addedRecord && (
            <Snack variant='success' >
              <p className="">{t("tutors:book.successMessage")}</p>
            </Snack>
          )}
        </>
      )}
    </>
  );
};

export default BookingModalContent;
