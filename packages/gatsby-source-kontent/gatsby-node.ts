import {
  CustomPluginOptions,
  CustomCreateSchemaCustomizationArgs,
} from './src/types';
import { SourceNodesArgs } from 'gatsby';

import { kontentItemsCreateSchemaCustomization } from './src/createSchemaCustomization.items';
import { kontentItemsSourceNodes } from './src/sourceNodes.items';
import { kontentTaxonomiesCreateSchemaCustomization } from './src/createSchemaCustomization.taxonomies';
import { kontentTaxonomiesSourceNodes } from './src/sourceNodes.taxonomies';
import { kontentTypesCreateSchemaCustomization } from './src/createSchemaCustomization.types';
import { kontentTypesSourceNodes } from './src/sourceNodes.types';

export {
  kontentItemsCreateSchemaCustomization as createSchemaCustomization,
  kontentItemsSourceNodes as sourceNodes,
};

exports.createSchemaCustomization = async (
  api: CustomCreateSchemaCustomizationArgs,
  pluginConfig: CustomPluginOptions,
): Promise<void> => {
  try {
    await kontentItemsCreateSchemaCustomization(api, pluginConfig);
    if (pluginConfig.includeTaxonomies) {
      await kontentTaxonomiesCreateSchemaCustomization(api);
    }
    if (pluginConfig.includeTypes) {
      await kontentTypesCreateSchemaCustomization(api);
    }
  } catch (error) {
    api.reporter.error("Gatsby kontent source plugin resulted to error in `createSchemaCustomization` method", error);
    api.reporter.verbose(`Complete error: ${JSON.stringify(error, null, 2)}`);
    throw error;
  }

};

exports.sourceNodes = async (
  api: SourceNodesArgs,
  pluginConfig: CustomPluginOptions,
): Promise<void> => {
  try {

    await kontentItemsSourceNodes(api, pluginConfig);
    if (pluginConfig.includeTaxonomies) {
      await kontentTaxonomiesSourceNodes(api, pluginConfig);
    }
    if (pluginConfig.includeTypes) {
      await kontentTypesSourceNodes(api, pluginConfig);
    }
  } catch (error) {
    api.reporter.error("Gatsby kontent source plugin resulted to error in `sourceNodes` method", error);
    api.reporter.verbose(`Complete error: ${JSON.stringify(error, null, 2)}`);
    throw error;
  }
};
