import { NextResponse } from "next/server";
import fs from "fs/promises";

import { connectDB } from "@/lib/db/mongo";
import Document from "@/models/document";
import { qdrant } from "@/lib/db/qudrant";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      document: doc,
    });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const doc = await Document.findByIdAndUpdate(
      id,
      {
        title: body.title,
      },
      {
        new: true,
      },
    );

    return NextResponse.json({
      document: doc,
    });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     // ------MONGO--------------

//     const doc = await Document.findById(id);
//     if (!doc) {
//       return NextResponse.json(
//         { error: "Document not found" },
//         { status: 404 },
//       );
//     }

//     await Document.findByIdAndDelete(id);

//     // ----------  Delete uploaded file--------------

//     if (doc.filePath) {
//       await fs.unlink(doc.filePath).catch(() => {});
//     }

//     // -----------Delete extracted text file-------------
//     if (doc.textFilePath) {
//       await fs.unlink(doc.textFilePath).catch(() => {});
//     }

//     // -----------Delete vectors from Qdrant -------------
//     await qdrant.delete("docmind-documents", {
//       filter: {
//         must: [
//           {
//             key: "documentId",
//             match: {
//               value: id,
//             },
//           },
//         ],
//       },
//     });
//     // ------------------------
//     const deleteStatus = {
//       fromMongo: true,
//       fromQudrant: true,
//       uploadedFile: true,
//       extractedText: true,
//     };

//     return NextResponse.json({
//       success: true,
//       deleteStatus,
//     });
//   } catch {
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const deleteStatus = {
      mongo: false,
      qdrant: false,
      uploadedFile: false,
      extractedText: false,
    };

    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    // Delete Mongo document
    const mongoResult = await Document.findByIdAndDelete(id);

    deleteStatus.mongo = !!mongoResult;

    // Delete uploaded file
    if (doc.filePath) {
      try {
        await fs.unlink(doc.filePath);
        deleteStatus.uploadedFile = true;
      } catch (err) {
        console.error("Failed to delete uploaded file:", err);
      }
    }

    // Delete extracted text file
    if (doc.textFilePath) {
      try {
        await fs.unlink(doc.textFilePath);
        deleteStatus.extractedText = true;
      } catch (err) {
        console.error("Failed to delete text file:", err);
      }
    }

    // Delete Qdrant vectors
    try {
      await qdrant.delete("docmind-documents", {
        filter: {
          must: [
            {
              key: "documentId",
              match: {
                value: id,
              },
            },
          ],
        },
      });

      deleteStatus.qdrant = true;
    } catch (err) {
      console.error("Failed to delete Qdrant vectors:", err);
    }
    console.log("deleteStatus:", deleteStatus);
    return NextResponse.json({
      success: true,
      deleteStatus,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Delete failed",
      },
      { status: 500 },
    );
  }
}
