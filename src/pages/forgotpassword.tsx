import React from "react";
import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      title={
        <ThemedTitleV2
          text="DAMS Portal"
          collapsed={false}
          wrapperStyles={{
            gap: "8px",
          }}
        />
      }
      formProps={{
        defaultValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
    />
  );
};
