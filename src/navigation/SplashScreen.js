import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import i18n from "i18n-js";

import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

import { tryAutoLogin } from "../store/actions";

function SplashScreen() {
  const token = useSelector(state => state.auth.token);
  const isAutoLoginLoading = useSelector(state => state.auth.autoLoginLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);

  if (isAutoLoginLoading) {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "transparent",
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator color="#34495e" size="large" />
        <Text style={{ color: "#34495e" }}>
          {" "}
          {`${i18n.t("common.loading")}...`}{" "}
        </Text>
      </View>
    );
  }

  if (token) return <HomeStack />;
  return <AuthStack />;
}

export default SplashScreen;
