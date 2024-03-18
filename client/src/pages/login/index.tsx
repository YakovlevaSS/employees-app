import { Card, Form, Row, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/input";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";

export const Login = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
  }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit" loading={loginUserResult.isLoading}>
              Войти
            </CustomButton>
          </Form>

          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
