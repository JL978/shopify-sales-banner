import React, { useState } from "react";
import { Layout, Card, MediaCard, Button } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

export default function ProductInfo({ setId, id, loading, data, error }) {
  const [modalOpen, setModal] = useState(false);

  function handleResourcePicker(resources) {
    const products = resources.selection.map((product) => product.id);
    setModal(false);
    setId(products[0]);
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
        description="Pick a product for your banner"
      >
        <Card sectioned>
          {id === "" ? (
            <Button onClick={() => setModal(true)}>Choose a Product</Button>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <MediaCard
              title={data.nodes[0].title}
              primaryAction={{
                content: "Change Product",
                onAction: () => setModal(true),
              }}
              description={`
                  Price: $${data.nodes[0].variants.edges[0].node.price}
                  `}
            >
              <img
                alt={data.nodes[0].images.edges[0].node.altText}
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={data.nodes[0].images.edges[0].node.originalSrc}
              />
            </MediaCard>
          )}
        </Card>
      </Layout.AnnotatedSection>
    </>
  );
}
