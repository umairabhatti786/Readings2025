import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import { colors } from "../../../utils/colors";
import AnswerContainer from "./AnswerContainer";

const HelpAndSupportScreen = () => {
  const SupportQuestionsAnswers = [
    {
      quesstion: "How can I place an order with Readings?",
      answer:
        "You have several convenient ways to place an order with Readings:",
      points: [
        {
          heading: "1. Website Orders:",
          details: [
            {
              point:
                "To place an order online, you need to create a User Account on our website. You can sign up directly or log in using your Google or Facebook account.",
            },
          ],
        },
        {
          heading: "2. Mobile App Orders:",
          details: [
            {
              point:
                "If you're using the Readings mobile app, simply log in to your account, browse the products, add them to your cart, and follow the checkout process. You’ll enjoy a streamlined and user-friendly experience for placing orders directly from your phone.",
            },
          ],
        },
        {
          heading: "3. Email Orders:",
          details: [
            {
              point:
                "You can email us your order at [orders@readings.com.pk](mailto:orders@readings.com.pk). Please include the following details:",
            },
            {
              point:
                "- The contents of your cart or the complete title, author, ISBN, and Readings price of the item(s) you want to order",
            },
            {
              point:
                "- Your complete postal address and both landline and mobile phone numbers.",
            },
            {
              point: "- Preferred mode of payment",
            },
            {
              point: "- Packing option",
            },
            {
              point: "- Shipping method (for prepaid orders only)",
            },
          ],
        },

        {
          heading: "4. Telephone Orders:",
          details: [
            {
              point:
                "You can call us at 042-35292627 between 9am to 5pm (working days only) to place your order. Please provide:",
            },
            {
              point:
                "- The title, author, ISBN, and Readings price of the items you wish to order",
            },
            {
              point:
                "- Your postal address, landline, and mobile phone numbers",
            },
            {
              point: "- Mode of payment",
            },
            {
              point: "- Packing option",
            },
            {
              point: "- Shipping method (for prepaid orders only)",
            },
          ],
        },

        {
          heading: "5. SMS Orders:",
          details: [
            {
              point:
                "For SMS orders, simply text your order details to 0300 0450227. Make sure to include:",
            },
            {
              point:
                "- The title, author, ISBN, and Readings price of the items",
            },
            {
              point:
                "- Your postal address, landline, and mobile phone numbers",
            },
            {
              point: "- Mode of payment",
            },
            {
              point: "- Packing option",
            },
            {
              point: "- Shipping method (for prepaid orders only)",
            },
          ],
        },
        {
          heading:
            "Choose the method that's most convenient for you to place your order, whether online, through the app, via email, phone, or SMS!",
        },
      ],
    },
    {
      quesstion: "How can I order Out of Stock or On Demand books?",
      answer:
        "If the book(s) you want are out of stock or available on demand, you can still place an order with us. Here’s how it works:",
      points: [
        {
          heading: "",
          details: [
            {
              point:
              "1. Once you place your order, we will confirm the availability of the book(s) with the publisher."
            },
            {
              point:
              "2. If the book(s) are available, we will place an order for you and ensure it is delivered to your doorstep once it arrives."
            },
            {
              point:
              "The process typically takes 2-6 weeks, but in some cases, it may take longer depending on the availability and shipping times from the publisher."
            },
            {
              point:
              "We’ll keep you updated on the status of your order, and you’ll receive your book(s) as soon as they are available."
            },
          ],
        },
        
        
      ],
    },
    {
      quesstion: "How can I request a book that is not available at Readings?",
      answer:
      "If you are looking for a book that is not currently available at Readings, you can easily request it by following these steps:",
      points: [
        {
          heading: "",
          details: [
            {
              point:
              "1. Fill out the Request a Book form in the menu."
            },
            {
              point:
              "2. Once we receive your request, our team will review it and get back to you within 48 hours."
            },
            {
              point:
              "If we are able to source the book you requested, we will inform you on how to proceed with your order"
            },
           
          ],
        },
        
        
      ],
    },
    {
      quesstion: "How can I make a payment for my order on Readings?",
      answer:
        "We offer several convenient payment methods for you to choose from:",
      points: [
        {
          heading: "1. Cash on Delivery:",
          details: [
            {
              point:
              "This is one of the most popular payment methods. With Cash on Delivery, you can pay for your order when it arrives at your doorstep. Please note that delivery may take up to 7 days, especially for orders going to remote areas of Pakistan"
            },
          ],
        },
        {
          heading: "2. Credit Card (Visa & MasterCard):",
          details: [
            {
              point:
              "You can securely pay for your order using a Visa or MasterCard credit card. Your bank card will be charged for the exact invoice amount, including any delivery charges (if applicable). All payments are processed through a trusted payment gateway using secure encryption technology to ensure the safety of your card information"
            },
          ],
        },
        {
          heading: "3. Online Bank Transfer:",
          details: [
            {
              point:
              "If you prefer to pay via an online bank transfer, you can select from the following bank options:"
            },
            {
              point:
              "- Bank: Allied Bank"
            },
            {
              point:
                "- Account Title: Elan Vital Private Limited",
            },
            {
              point: "- Account No: 0010070305740013",
            },
            {
              point: "- Branch Code: 0216",
            },
            {
              point: "- Branch: Main Market Gulberg Branch, Lahore",
            },
          ],
        },

        {
          heading: "Easy Paisa / Jazz Cash:",
          details: [
            {
              point:
              "You can also make your payment via Easy Paisa or Jazz Cash. Simply send your payment to the following mobile number: 0301-1555527."
            },
            {
              point:
              "Choose the payment method that works best for you to complete your order!"
            },
           
          ],
        },

      ],
    },

    {
      quesstion: "What are the packing and shipping options available for my order on Readings?",
      answer:
        "We offer a variety of packing and shipping options to ensure your order reaches you safely and on time.",
      points: [
        {
          heading: "Packing",
          details: [
            {
              point:
              "- Standard Packing: All orders are packaged using standard packing materials."
            },
            {
              point:
              "- Gift Wrapping: If you’d like to gift wrap your order, we offer this service for an additional Rs. 50"
            },
          ],
        },
        {
          heading: "Shipping",
          details: [
            {
              point:
              "- Shipping Charges: A flat shipping fee of PKR 150 is applied to all orders."
            },
          ],
        },
        {
          heading: "Shipping Methods",
          details: [
            {
              point:
              "1. Prepaid Orders:"
            },
            {
              point:
              "For prepaid orders, you can choose from the following shipping options during checkout:"
            },
            {
              point:
                "- Courier Service",
            },
            {
              point: "- UMS",
            },
            {
              point: "- Book Post",
            },
            {
              point: "If you prefer to use a different shipping company, you may request it; however, you will be responsible for the additional shipping costs incurred.",
            },

            {
              point: "2. Cash on Delivery Orders:",
            },
            {
              point: "For Cash on Delivery (COD) orders, we will ship your items via one of the following services:",
            },

            {
              point: "- Leopard Courier Service",
            },


            {
              point: "- Daewoo Express",
            },
            {
              point: "- Pakistan Post",
            },
          ],
        },

        {
          heading: "Delivery Time",
          details: [
            {
              point:
              "- Nationwide Delivery:"
            },
            {
              point:
              "- Prepaid orders are generally delivered within 2-3 days."
            },
            {
              point:
              "- COD orders may take up to 7 days for delivery."
            },
            {
              point:
              "- Lahore Delivery"
            },
            {
              point:
              "- Orders in Lahore are usually delivered the next working day."
            },
            {
              point:
              "- Please note that next-day delivery may be delayed due to unexpected disruptions in town or adverse weather conditions"
            },
            {
              point:
              "We strive to ensure timely delivery for all orders, but please allow extra time during peak periods or unforeseen circumstances"
            },
           
          ],
        },

      ],
    },

    {
      quesstion: "How can I track my order from Readings?",
      answer:
        "You can easily track your order, depending on the shipping method used:",
      points: [
        {
          heading: "1. Orders Dispatched via Courier Companies: ",
          details: [
            {
              point:
              "If your order has been shipped through a courier company, you will receive a Dispatch Notification email containing tracking information. You can use this tracking number to check the status of your shipment on the courier's website. Alternatively, you can visit our Orders tab to track your order."
            },
            
          ],
        },
        {
          heading: "2. Other Prepaid or Cash on Delivery Orders",
          details: [
            {
              point:
              "For all other prepaid and Cash on Delivery orders, you can visit the Order tab to check the current status of your order."
            },
            {
              point:
              "Please note that tracking is only available for orders dispatched via courier services, and the status for other orders can be checked directly on our website."
            },
          ],
        },
        ,

      ],
    },

    {
      quesstion: "How can I cancel my order with Readings?",
      answer:
        "You can cancel your order only if it has not started processing",
      points: [
        {
          heading: "To cancel your order:",
          details: [
            {
              point:
              "1. Go to the Orders tab on your account."
            },

            {
              point:
              "2. Click the Cancel button next to the order you wish to cancel."
            },
            {
              point:
              "Please note that once your order has started processing, it cannot be cancelled. We recommend checking the status of your order before attempting to cancel."
            },
            
          ],
        },
       

      ],
    },

    {
      quesstion: "What is the process for returning items or claiming a replacement/refund with Readings?",
      answer:
        "We accept returns and offer replacements or refunds under the following conditions:",
      points: [
        {
          heading: "Returns",
          details: [
            {
              point:
              "You can return an item if:"
            },

            {
              point:
              "- The item was not part of your original order."
            },
            {
              point:
              "- The item has a production imperfection"
            },
            
          ],
        },
        {
          heading: "",
          details: [
            {
              point:
              "To initiate a return, you must:"
            },

            {
              point:
              "1. Report the issue within 24 hours of receiving your order."
            },
            {
              point:
              "2. Send the item back to us in its original packaging within 3 working days."
            },
            {
              point:
              "Please note that any claims that do not meet these criteria will not be accepted."
            },
            
          ],
        },

        {
          heading: "Replacements / Refunds",
          details: [
            {
              point:
              "- If you receive an incorrect item, you are entitled to request a replacement or a refund."
            },

            {
              point:
              "- Replacement: If you opt for a replacement, we will send the correct item to you free of charge"
            },
            {
              point:
              "- Refund: If you prefer a refund, we will process it and offer a refund method. The amount will be refunded to you within 15-30 days"
            },
           
            
          ],
        },
       

      ],
    },

    {
      quesstion: "Does Readings deliver internationally?",
      answer:
        "Currently, we do not offer international delivery. However, if you're located abroad and would like to place an order for delivery within Pakistan, you can do so by following these steps:",
      points: [
        {
          heading: "",
          details: [
            {
              point:
              "- Your order must be prepaid using a Visa or MasterCard bank card."
            },

            {
              point:
              "- Once payment is processed, we will ship your order to any location within Pakistan."
            },
            {
              point:
              "Please ensure that the payment is completed in advance, as all international orders to Pakistan need to be prepaid."
            },
            
          ],
        },
       

      ],
    },
  ];
  return (
    <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
      }}
    >
      <View
        style={{
          paddingBottom: verticalScale(10),
        }}
      >
        <TopHeader title="Help & Support" />
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.dull_white }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          paddingBottom: verticalScale(20),
          gap: verticalScale(10),
          paddingTop: verticalScale(10),
        }}
      >
        <View style={styles.detailConainer}>
          {SupportQuestionsAnswers.map((item, index) => {
            return (
              <View style={{ marginTop: verticalScale( index>0? 15:0) }}>
                <AnswerContainer item={item} index={index} />
              </View>
            );
          })}
        </View>

        <CustomText
          text={
            'Please make sure to report any issues promptly and adhere to the guidelines for a smooth returns or refund process. For further assistance, feel free to reach out to us.'
          }
          color={colors.black}
          size={14}
        />
        <CustomText
          text={'Cant find what you re looking for? Were Here for You!'}
          color={colors.grey}
          size={14}
        />
        <View style={{...styles.detailConainer, gap: verticalScale(15)}}>
          <CustomText
            text={
              'Our offices are open Monday to Saturday from 9:00 AM to 5:00 PM.'
            }
            color={colors.orange}
            size={12}
          />

          <View style={{gap: verticalScale(2)}}>
            <CustomText
              text={`Contact Us:\n* Phone: 042-35292627 (Available during office hours)`}
              color={colors.black}
              size={12}
            />
            <CustomText
              text={'* WhatsApp: 0300-0450227 (Available during office hours)'}
              color={colors.black}
              size={12}
            />
            <CustomText
              text={'* Email: orders@readings.com.pk'}
              color={colors.black}
              size={12}
            />
          </View>

          <CustomText
            text={
              'Feel free to reach out to us during working hours. We re happy to assist you!'
            }
            color={colors.black}
            size={12}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default HelpAndSupportScreen;

const styles = StyleSheet.create({
  detailConainer: {
    width: "100%",
    borderRadius: scale(10),
    padding: scale(15),
  
    backgroundColor: colors.white,
  },
});
