const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file === 'content.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findHtmlFiles('app');

function inspectHeadElements(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return null;
  
  const headContent = headMatch[1];
  
  // Let's identify all comments in head
  const comments = headContent.match(/<!--[\s\S]*?-->/g) || [];
  
  // Let's identify all <meta> tags
  const metas = headContent.match(/<meta[^>]*>/gi) || [];
  
  // Let's identify all <link> tags
  const links = headContent.match(/<link[^>]*>/gi) || [];
  
  // Let's identify all <script> tags
  const scripts = headContent.match(/<script[\s\S]*?<\/script>/gi) || [];
  
  // Let's identify all <template> tags
  const templates = headContent.match(/<template[\s\S]*?<\/template>/gi) || [];
  
  // Let's identify all <style> tags
  const styles = headContent.match(/<style[\s\S]*?<\/style>/gi) || [];
  
  return {
    commentsCount: comments.length,
    metas,
    links,
    scriptsCount: scripts.length,
    templatesCount: templates.length,
    stylesCount: styles.length,
    totalHeadLen: headContent.length
  };
}

const homeInfo = inspectHeadElements('app/content.html');
console.log("HOME HEAD INFO:");
console.log("Metas:", homeInfo.metas);
console.log("\nLinks:", homeInfo.links);
console.log("\nStats: comments:", homeInfo.commentsCount, "scripts:", homeInfo.scriptsCount, "templates:", homeInfo.templatesCount, "styles:", homeInfo.stylesCount);
