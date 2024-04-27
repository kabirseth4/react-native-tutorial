import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FormField } from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { useState } from "react";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const { username, email, password } = form;

    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(username, email, password);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 h-full w-full justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />

          <Text className="text-semibold mt-10 font-psemibold text-2xl text-white">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => {
              setForm((prevForm) => ({ ...prevForm, username: e }));
            }}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm((prevForm) => ({ ...prevForm, email: e }));
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm((prevForm) => ({ ...prevForm, password: e }));
            }}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="font-psemibold text-lg text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
