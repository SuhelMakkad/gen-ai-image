export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: August 30, 2025</p>

        <h2>Service Description</h2>
        <p>
          Gen AI provides AI-powered image generation services. By using our service, you agree to
          these terms.
        </p>

        <h2>Acceptable Use</h2>
        <ul>
          <li>Use the service for lawful purposes only</li>
          <li>Do not generate harmful, illegal, or inappropriate content</li>
          <li>Respect intellectual property rights</li>
          <li>Do not attempt to reverse engineer our AI models</li>
        </ul>

        <h2>Subscription and Billing</h2>
        <ul>
          <li>Subscriptions auto-renew monthly</li>
          <li>Credits do not carry over between billing periods</li>
          <li>Refunds subject to our discretion within 7 days</li>
          <li>We may modify pricing with 30 days notice</li>
        </ul>

        <h2>Content and Ownership</h2>
        <ul>
          <li>You own the images you generate</li>
          <li>We may use generated images for service improvement (anonymized)</li>
          <li>You grant us license to display your public showcase images</li>
          <li>We reserve the right to remove content violating these terms</li>
        </ul>

        <h2>Service Availability</h2>
        <ul>
          <li>We provide the service &quot;as is&quot; without guarantees</li>
          <li>We may suspend service for maintenance or violations</li>
          <li>We are not liable for service interruptions</li>
        </ul>

        <h2>Privacy</h2>
        <p>
          Your privacy is important to us. See our Privacy Policy for details on data collection
          and use.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms. Continued use constitutes acceptance of changes.
        </p>

        <h2>Contact</h2>
        <p>For questions about these terms, contact us through our support channels.</p>
      </div>
    </main>
  );
}