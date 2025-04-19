const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Algoliaの認証情報
const appId = 'O4N28IZQ7Y';
const apiKey = 'dad2c21a6ea864abbed40a0462bce480';
const indexName = 'english-phrases';

// クライアントの初期化
const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);

// ブログ記事のデータを取得
const blogDir = path.join(__dirname, '../blog');
const blogFiles = fs.readdirSync(blogDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const title = content.match(/title: (.*)/)?.[1] || '';
    const description = content.match(/description: (.*)/)?.[1] || '';
    const date = content.match(/date: (.*)/)?.[1] || '';
    
    return {
      objectID: file.replace('.md', ''),
      title,
      description,
      date,
      content: content.replace(/---[\s\S]*?---/, '').trim(),
      type: 'blog',
      url: `/blog/${file.replace('.md', '')}`
    };
  });

// ドキュメントのデータを取得
const docsDir = path.join(__dirname, '../docs');
const docFiles = fs.readdirSync(docsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const title = content.match(/title: (.*)/)?.[1] || '';
    
    return {
      objectID: `doc-${file.replace('.md', '')}`,
      title,
      content: content.replace(/---[\s\S]*?---/, '').trim(),
      type: 'doc',
      url: `/docs/${file.replace('.md', '')}`
    };
  });

// データをAlgoliaにインポート
async function importData() {
  try {
    // ブログ記事のインポート
    await index.saveObjects(blogFiles);
    console.log('ブログ記事のインポートが完了しました');

    // ドキュメントのインポート
    await index.saveObjects(docFiles);
    console.log('ドキュメントのインポートが完了しました');

    // 検索可能な属性の設定
    await index.setSettings({
      searchableAttributes: [
        'title',
        'description',
        'content'
      ],
      attributesForFaceting: [
        'type'
      ]
    });
    console.log('検索設定が完了しました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

importData(); 