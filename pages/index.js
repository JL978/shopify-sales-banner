import { useState } from "react";
import { EmptyState, Page } from "@shopify/polaris";
import { TitleBar, ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  return (
    <Page>
      <TitleBar title="Home" />
      <EmptyState
        heading="Create Sale Banner"
        action={{
          content: "Select product",
          onAction: () => {
            router.push("/create");
          },
        }}
        secondaryAction={{
          content: "Learn more",
          url: "https://help.shopify.com",
        }}
        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
      >
        <p>Create a sale banner on your page</p>
      </EmptyState>
    </Page>
  );
}

export default Index;
