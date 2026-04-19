"use client";

import { useActionState } from "react";
import { createBlogPost } from "@/app/admin/blog/actions";
import { FormGroup } from "@/components/admin/FormGroup";
import styles from "@/app/admin/admin.module.css";
import { Loader2 } from "lucide-react";

export function BlogForm() {
  const [state, action, isPending] = useActionState(createBlogPost as any, { error: null });

  return (
    <form action={action} className={styles.form}>
      {state?.error && <div className="text-red-500 mb-4">{state.error}</div>}

      <FormGroup label="Post Title *" id="title">
        <input className="input" type="text" id="title" name="title" placeholder="e.g. 5 Tips for Perfect Nails" required />
      </FormGroup>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <FormGroup label="Author Name" id="authorName">
          <input className="input" type="text" id="authorName" name="authorName" placeholder="e.g. KSW Expert" />
        </FormGroup>
        <FormGroup label="SEO Keywords" id="keywords">
          <input className="input" type="text" id="keywords" name="keywords" placeholder="e.g. Nail Art, Makeup Tips" />
        </FormGroup>
      </div>

      <FormGroup label="Search Engine Description" id="metaDescription">
        <textarea className="input" id="metaDescription" name="metaDescription" rows={2} placeholder="Brief summary for Google..." />
      </FormGroup>

      <FormGroup label="Short Excerpt" id="excerpt">
        <textarea className="input" id="excerpt" name="excerpt" rows={2} placeholder="A short catch-phrase for the list..." />
      </FormGroup>

      <FormGroup label="Cover Image" id="image">
        <input className="input" type="file" id="image" name="image" accept="image/*" />
      </FormGroup>

      <FormGroup label="Post Content (Markdown Support)" id="content">
        <textarea className="input font-mono text-sm" id="content" name="content" placeholder="Write your content here..." rows={12} required />
      </FormGroup>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
         <input type="checkbox" id="published" name="published" defaultChecked />
         <label htmlFor="published" style={{ fontWeight: 600 }}>Publish Immediately</label>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={isPending}>
        {isPending ? <Loader2 className="spinner" /> : "Post to Journal"}
      </button>
    </form>
  );
}
