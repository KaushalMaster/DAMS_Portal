import React from "react";
import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

export const Register = () => {
  return (
    <AuthPage
      type="register"
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
