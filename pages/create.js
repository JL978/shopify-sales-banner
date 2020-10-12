import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  PageActions,
  ColorPicker,
  Select,
  hsbToRgb,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import ProductInfo from "../components/ProductInfo";
import Banner from "../components/Banner";

import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        description
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

function Create() {
  const [form, setForm] = useState({
    title: "",
    percentage: "0",
  });
  const [textColor, setTextColor] = useState({
    hue: 0,
    brightness: 1,
    saturation: 0,
  });
  const [bgColor, setbgColor] = useState({
    hue: 0,
    brightness: 0,
    saturation: 0,
  });
  const [location, setLocation] = useState("top");
  const [id, setId] = useState("");

  const textColorChange = useCallback(setTextColor, []);
  const bgColorChange = useCallback(setbgColor, []);
  const handleLocationChange = useCallback((value) => setLocation(value), []);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      ids: [id],
    },
  });

  const options = [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
    { label: "Custom", value: "custom" },
  ];

  const setProductId = (id) => {
    setId(id);
  };

  return (
    <Page
      breadcrumbs={[{ content: "Home", url: "/" }]}
      title="Create a Sales banner"
    >
      <TitleBar title="Create" />

      <Layout>
        <Layout.AnnotatedSection
          title="Banner Information"
          description="Customize your banner"
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                type="text"
                value={form.title}
                label="Title"
                onChange={(text) =>
                  setForm((form) => ({ ...form, title: text }))
                }
              />
              <TextField
                type="text"
                label="Sales Percentage"
                value={form.percentage}
                onChange={(text) =>
                  setForm((form) => ({ ...form, percentage: text }))
                }
              />
              <div className="Polaris-Label">
                <label className="Polaris-Label__Text">Choose Text Color</label>
              </div>
              <ColorPicker onChange={textColorChange} color={textColor} />
              <div className="Polaris-Label">
                <label className="Polaris-Label__Text">
                  Choose Background Color
                </label>
              </div>
              <ColorPicker onChange={bgColorChange} color={bgColor} />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>

        <ProductInfo
          setId={setProductId}
          id={id}
          loading={loading}
          data={data}
          error={error}
        />

        <Layout.AnnotatedSection
          title="Banner Location"
          description="Choose where you would like the banner to appear"
        >
          <Card sectioned>
            <FormLayout>
              <Select
                label="Location"
                options={options}
                onChange={handleLocationChange}
                value={location}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>

        <Layout.Section>
          <Card title="Banner Preview" sectioned>
            {id && !loading && (
              <Banner
                bgColor={hsbToRgb(bgColor)}
                textColor={hsbToRgb(textColor)}
                img={data.nodes[0].images.edges[0].node.originalSrc}
                form={form}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
      <PageActions
        primaryAction={{
          content: "Save",
          onAction: () => {
            const saveData = {
              form,
              id,
              bgColor: hsbToRgb(bgColor),
              textColor: hsbToRgb(textColor),
              location,
            };
            console.log(saveData);
          },
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
