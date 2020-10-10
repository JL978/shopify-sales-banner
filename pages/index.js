import { useState } from "react";
import { EmptyState, Page } from "@shopify/polaris";
import { TitleBar, ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import { useRouter } from "next/router";

function Index() {
  const [modalOpen, setModal] = useState(false);
  const router = useRouter();

  function handleResourcePicker(resources) {
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    setModal(false);
    router.push("/create");
  }

  return (
    <Page>
      <TitleBar title="Home" />
      <ResourcePicker
        resourceType="Product"
        open={modalOpen}
        onCancel={() => setModal(false)}
        showVariants={false}
        onSelection={(resources) => handleResourcePicker(resources)}
      />
      <EmptyState
        heading="Create Sale Banner"
        action={{
          content: "Select product",
          onAction: () => {
            setModal(true);
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
