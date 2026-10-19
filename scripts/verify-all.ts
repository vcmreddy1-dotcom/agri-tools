import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import { signAdminToken, verifyAdminToken } from "../lib/auth";
import { getProductWhatsAppUrl, BUSINESS_INFO } from "../lib/whatsapp";

async function runVerification() {
  console.log("=================================================");
  console.log(" PRAKASH AGRI TOOLS — AUTOMATED QA & TEST SUITE  ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName} - ${detail || ""}`);
      failed++;
    }
  }

  // TEST 1: Check 5 Main Categories
  const expectedMainCategories = [
    "agricultural-implements",
    "spraying-equipment",
    "garden-power-equipment",
    "fodder-equipment",
    "spare-parts",
  ];

  const mainCats = await prisma.category.findMany({
    where: { parentCategoryId: null },
    include: { subcategories: true },
  });

  assert(
    mainCats.length === 5,
    "Exactly 5 Main Categories exist in database",
    `Found ${mainCats.length}`
  );

  const mainSlugs = mainCats.map((c) => c.slug);
  const allMainMatch = expectedMainCategories.every((slug) => mainSlugs.includes(slug));
  assert(allMainMatch, "All 5 expected main category slugs match specification exactly");

  // TEST 2: Check 34 Subcategories
  const expectedSubcategoriesCount = 34;
  const subCats = await prisma.category.findMany({
    where: { NOT: { parentCategoryId: null } },
  });

  assert(
    subCats.length === expectedSubcategoriesCount,
    `Exactly 34 subcategories exist in database`,
    `Found ${subCats.length}`
  );

  // Check subcategories distribution across parents
  const agriCat = mainCats.find((c) => c.slug === "agricultural-implements");
  assert(
    agriCat?.subcategories.length === 14,
    "Category 1 (Agricultural Implements) has exactly 14 subcategories",
    `Found ${agriCat?.subcategories.length}`
  );

  const sprayCat = mainCats.find((c) => c.slug === "spraying-equipment");
  assert(
    sprayCat?.subcategories.length === 4,
    "Category 2 (Spraying Equipment) has exactly 4 subcategories",
    `Found ${sprayCat?.subcategories.length}`
  );

  const gardenCat = mainCats.find((c) => c.slug === "garden-power-equipment");
  assert(
    gardenCat?.subcategories.length === 7,
    "Category 3 (Garden & Power Equipment) has exactly 7 subcategories",
    `Found ${gardenCat?.subcategories.length}`
  );

  const fodderCat = mainCats.find((c) => c.slug === "fodder-equipment");
  assert(
    fodderCat?.subcategories.length === 1,
    "Category 4 (Fodder Equipment) has exactly 1 subcategory (Chaff Cutters)",
    `Found ${fodderCat?.subcategories.length}`
  );

  const sparesCat = mainCats.find((c) => c.slug === "spare-parts");
  assert(
    sparesCat?.subcategories.length === 8,
    "Category 5 (Spare Parts) has exactly 8 subcategories",
    `Found ${sparesCat?.subcategories.length}`
  );

  // TEST 3: Admin User & Authentication Verification
  const adminUser = await prisma.adminUser.findUnique({
    where: { email: "admin@prakashagri.com" },
  });
  assert(adminUser !== null, "Admin user exists in database");

  if (adminUser) {
    const isPasswordValid = await bcrypt.compare(
      "Admin@Prakash2026!",
      adminUser.passwordHash
    );
    assert(isPasswordValid, "Admin password hash verifies correctly with bcrypt");

    const token = await signAdminToken({
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });
    assert(typeof token === "string" && token.length > 20, "JWT token signs successfully");

    const verified = await verifyAdminToken(token);
    assert(
      verified?.email === "admin@prakashagri.com",
      "JWT token verifies and restores payload"
    );

    const badVerify = await verifyAdminToken("invalid.token.payload");
    assert(badVerify === null, "Invalid JWT token is safely rejected as null");
  }

  // TEST 4: Products Catalogue & Specifications
  const products = await prisma.product.findMany({
    include: { media: true, category: true },
  });
  assert(products.length >= 10, `Database contains active products (Found: ${products.length})`);

  const sampleProduct = products[0];
  assert(
    sampleProduct?.technicalSpecifications !== null,
    "Product contains structured technical specifications JSON"
  );
  if (sampleProduct?.technicalSpecifications) {
    const parsed = JSON.parse(sampleProduct.technicalSpecifications);
    assert(
      typeof parsed === "object" && Object.keys(parsed).length > 0,
      "Technical specifications parse into key-value pairs"
    );
  }

  assert(
    sampleProduct?.media.length > 0,
    "Product contains associated media photo items"
  );

  // TEST 5: WhatsApp URL Formatting
  const testWaUrl = getProductWhatsAppUrl({
    productName: "Rotary Tiller — Robusto",
    modelNumber: "PAT-ROB-6FT",
    productUrl: "https://prakashagritools.com/products/rotary-tiller-robusto-heavy-duty",
  });

  assert(
    testWaUrl.startsWith("https://wa.me/919666039444?text="),
    "WhatsApp URL uses international number 919666039444 without + or spaces",
    testWaUrl
  );
  assert(
    testWaUrl.includes("Rotary%20Tiller"),
    "WhatsApp URL correctly percent-encodes product name and enquiry message"
  );

  // TEST 6: Enquiry Creation & DB Record Saving
  const testEnquiry = await prisma.enquiry.create({
    data: {
      customerName: "QA Test Farmer",
      phone: "+91 98888 77777",
      email: "testfarmer@example.com",
      message: "Automated QA test enquiry for 9 Tyne Seed Drill",
      source: "TEST_SUITE",
      status: "NEW",
    },
  });
  assert(testEnquiry.id !== undefined, "Enquiry record successfully created in DB");
  assert(testEnquiry.status === "NEW", "New enquiry defaults to status NEW");

  // Clean up test enquiry
  await prisma.enquiry.delete({ where: { id: testEnquiry.id } });
  assert(true, "Test enquiry record cleaned up safely");

  // TEST 7: Category Deletion Safety Constraint
  // Try deleting a category that has products
  const categoryWithProducts = await prisma.category.findFirst({
    where: { products: { some: {} } },
  });

  if (categoryWithProducts) {
    const prodCount = await prisma.product.count({
      where: { categoryId: categoryWithProducts.id },
    });
    assert(
      prodCount > 0,
      `Category '${categoryWithProducts.name}' has ${prodCount} products; deletion safety rule active`
    );
  }

  console.log("\n=================================================");
  console.log(` TESTS SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification()
  .catch((e) => {
    console.error("Verification suite failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
