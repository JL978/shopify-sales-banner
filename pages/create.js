import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  MediaCard,
  PageActions,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";

function Create() {
  return (
    <Page
      breadcrumbs={[{ content: "Home", url: "/" }]}
      title="Create a Sales banner"
    >
      <TitleBar title="Create" />
      <Layout>
        <Layout.AnnotatedSection
          title="Banner Information"
          description="Create a name for your banner"
        >
          <Card sectioned>
            <FormLayout>
              <TextField type="text" label="Title" onChange={() => {}} />
              <TextField
                type="text"
                label="Sales Percentage"
                onChange={() => {}}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Product Information"
          description="Create a name for your banner"
        >
          <Card sectioned>
            <MediaCard
              title="Something"
              primaryAction={{
                content: "Change Product",
                onAction: () => {},
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
      </Layout>
      <PageActions
        primaryAction={{
          content: "Save",
        }}
        secondaryActions={[
          {
            content: "Delete",
            destructive: true,
          },
        ]}
      />
    </Page>
  );
}

export default Create;
