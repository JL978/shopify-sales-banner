import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  PageActions,
  ColorPicker,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import ProductInfo from "../components/ProductInfo";

function Create() {
  const [form, setForm] = useState({
    title: "",
    percentage: "0",
  });

  const [textColor, setTextColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });
  const [bgColor, setbgColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const textColorChange = useCallback(setTextColor, []);
  const bgColorChange = useCallback(setbgColor, []);

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

        <ProductInfo />
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
