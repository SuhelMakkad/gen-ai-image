export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: August 30, 2025</p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Account information (name, email) from OAuth providers</li>
          <li>Generated image prompts and metadata</li>
          <li>Usage analytics and service performance data</li>
          <li>Payment information (processed by Polar)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>Provide and improve our AI image generation service</li>
          <li>Process payments and manage subscriptions</li>
          <li>Analyze usage patterns to enhance user experience</li>
          <li>Communicate service updates and support</li>
        </ul>

        <h2>Information Sharing</h2>
        <ul>
          <li>We do not sell your personal information</li>
          <li>Payment processing handled securely by Polar</li>
          <li>Anonymous usage data may be shared for research</li>
          <li>We may disclose information if required by law</li>
        </ul>

        <h2>Data Storage and Security</h2>
        <ul>
          <li>Data stored securely with industry-standard encryption</li>
          <li>Generated images stored temporarily for service delivery</li>
          <li>Account data retained while your account is active</li>
          <li>You may request data deletion by contacting support</li>
        </ul>

        <h2>Your Rights</h2>
        <ul>
          <li>Access your personal information</li>
          <li>Request data correction or deletion</li>
          <li>Opt out of marketing communications</li>
          <li>Export your generated images</li>
        </ul>

        <h2>Cookies and Analytics</h2>
        <ul>
          <li>We use essential cookies for service functionality</li>
          <li>Analytics help us improve user experience</li>
          <li>You can disable non-essential cookies in your browser</li>
        </ul>

        <h2>Third-Party Services</h2>
        <ul>
          <li>OAuth authentication via Google and GitHub</li>
          <li>Payment processing via Polar</li>
          <li>AI model services for image generation</li>
          <li>Each has their own privacy practices</li>
        </ul>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy. We&apos;ll notify users of significant changes via email or
          service notifications.
        </p>

        <h2>Contact Us</h2>
        <p>Questions about this privacy policy? Contact us through our support channels.</p>
      </div>
    </main>
  );
}