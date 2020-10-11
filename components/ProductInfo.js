import React, { useState } from "react";
import { Layout, Card, MediaCard } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

export default function ProductInfo() {
  const [modalOpen, setModal] = useState(false);

  function handleResourcePicker(resources) {
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    setModal(false);
  }
  return (
    <>
      <ResourcePicker
        resourceType="Product"
        open={modalOpen}
        onCancel={() => setModal(false)}
        showVariants={false}
        onSelection={(resources) => handleResourcePicker(resources)}
      />
      <Layout.AnnotatedSection
        title="Product Information"
        description="Create a name for your banner"
      >
        <Card sectioned>
          <MediaCard
            title="Something"
            primaryAction={{
              content: "Change Product",
              onAction: () => setModal(true),
            }}
            description={`
            Price: $100
            `}
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
            />
          </MediaCard>
        </Card>
      </Layout.AnnotatedSection>
    </>
  );
}
